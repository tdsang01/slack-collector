import { omit } from 'lodash';

export default class BaseRepo {
    constructor(model) {
        this._model = model;
    }

    async _getAll(params) {
        params = Object.assign(
            {
                where: null,
                limit: 20,
                skip: 0,
                sort: { createdAt: -1 },
                select: null,
                isLean: true,
                populate: ''
            },
            params
        );
        if (params.limit > 100) {
            params.limit = 100;
        }
        let isCountDocument = false;
        if (params.page) {
            isCountDocument = true;
            params.skip = params.page >= 1 ? params.limit * (params.page - 1) : 0;
        }
        let promises = [
            this._model
                .find(params.where)
                .limit(params.limit)
                .skip(params.skip)
                .sort(params.sort)
                .select(params.select)
                .lean(params.isLean)
                .populate(params.populate)
        ];
        if (isCountDocument) {
            promises.push(
                this._model.countDocuments(params.where)
            );
        }
        promises = await Promise.all(promises);
        return isCountDocument ? { totalItem: promises[1], items: promises[0] } : promises[0];
    }

    async _getOne(params) {
        params = Object.assign(
            {
                where: null,
                select: null,
                populate: '',
                sort: { createdAt: -1 },
                isLean: true
            },
            params
        );
        return await this._model
            .findOne(params.where)
            .select(params.select)
            .populate(params.populate)
            .sort(params.sort)
            .lean(params.isLean);
    }

    async _create(data, options) {
        const omits = getOmits(this._model.REMOVE_FIELDS, options);
        data = omit(data, omits);
        return await this._model.create(data);
    }

    async _insertMany(data) {
        return await this._model.insertMany(data);
    }

    async _update(data, options) {
        const omits = getOmits(this._model.REMOVE_FIELDS, options);
        data.set = omit(data.set, omits);
        if (!data.where) {
            throw new Error('MISSING_CONDITION')
        }
        data.where.deletedAt = null;
        const result = await this._model.updateOne(data.where, data.update, data.options);
        if (result.nModified === 0) {
            throw new Error('UPDATE_FAILED');
        }
        return result;
    }

    async _softDelete(data) {
        if (!data.where) {
            throw new Error('MISSING_CONDITION')
        }
        data.where.deletedAt = null;
        const result = await this._model.updateOne(data.where, { $set: { deletedAt: new Date() }});
        if (result.nModified === 0) {
            throw new Error('DELETE_FAILED');
        }
        return result;
    }
}

function getOmits(defaultOmits, options) {
    let removeFields = [];
    if (options && options.removeFields) {
        removeFields = options.removeFields;
    }
    let results = defaultOmits || removeFields;
    if (Array.isArray(defaultOmits)) {
        results = defaultOmits.concat(removeFields);
    }
    return results;
}
