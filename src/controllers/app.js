class AppController {
    constructor(model) {
        this._model = model
        this.create = this.create.bind(this)
        this.getAll = this.getAll.bind(this)
        this.getOne = this.getOne.bind(this)
        this.update = this.update.bind(this)
        this.delete = this.delete.bind(this)
    }

    async create(obj, res) {
        console.log(obj)
        try {
            const object = new this._model(obj)
            await object.save()
            return res.status(201).json(object)
        } catch(e) {
            res.status(400).json(e.message)
        }
    }

    async getAll(req, res) {
        try {
            const model = await this._model.find()
            return res.send(model)
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async getOne(req, res) {
        try {
            const model = await this._model.findOne({ _id: req.params.id })
            return res.json(model)
        } catch(e) {
            res.status(404).send(e)
        }
    }

    async update(req, res) {
        const updates = Object.keys(req.body)

        try {

            const model = await this._model.findOne({ _id: req.params.id })
            
            if(!model) {
                return res.status(404).json({ error: "Not found" })
            }
            
            await model.updateOne(req.body)
            const newModel = await this._model.findOne({ _id: req.params.id })
            
            res.send(newModel)
        } catch(e) {
            res.status(500).json({ error: "Something went wrong" })
        }
    } 

    async delete(req, res) {
        try {
            await this._model.findOneAndRemove({ _id: req.params.id })
            res.status(202).json({ message: "Removed successfully"})
        } catch(e) {
            res.status(404).send(e)
        }
    }
}

export default AppController