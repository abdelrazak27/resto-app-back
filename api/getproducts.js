const pool = require('../db');

module.exports = async (req, res) => {
    try {
        if (req.method === 'GET') {
            const { rows } = await pool.query('SELECT * FROM products');
            res.status(200).json(rows);
        } else {
            res.status(405).json({ error: 'Méthode utilisée non autorisée' })
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la récupération des produits');
    }
};