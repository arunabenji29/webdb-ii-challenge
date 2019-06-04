const knex = require('knex')

const router = require('express').Router();

const knexConfig = {
    client:'sqlite3',
    connection:{
        filename:'./data/lambda.db3',
    },
    useNullAsDefault:true,
    debug:true
};

const db = knex(knexConfig);

router.get('/', (req,res) => {
    db('zoos')
    .then(zoo => {
        res.status(200).json(zoo);
    })
    .catch(error => {
        res.status(500).json(error);
    }

    )
})

router.post('/', (req,res) => {
    db('zoos')
    .insert(req.body,'id')
    .then(ids => {
        res.status(201).json(ids);
    })
    .catch(error => {
        res.status(500).json(error);
    }

    )
})

router.put('/:id', (req,res) => {
    const changes = req.body
    db('zoos')
    .where({id:req.params.id})
    .update(changes)
    .then(count => {
        console.log('count ',count)
        if(count>0)
        {
            res.status(201).json(count);
        }
        else{
            res.status(404).json({message:'zoo id not found'});
        }
    })
    .catch(error => {
        console.log('update error ',error)
        res.status(500).json(error);
    }

    )
});

router.delete('/:id', (req,res) => {
    // const changes = req.body
    db('zoos')
    .where({id:req.params.id})
    .del()
    .then(count => {
        console.log('count ',count)
        if(count>0)
        {
            res.status(201).json(count);
        }
        else{
            res.status(404).json({message:'zoo id not found'});
        }
    })
    .catch(error => {
        console.log('update error ',error)
        res.status(500).json(error);
    }

    )
})

module.exports = router;