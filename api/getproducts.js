var admin = require("firebase-admin");

var serviceAccount = require("../pkey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const pool = require('../db');

module.exports = async (req, res) => {
    try {
        if (req.method === 'GET') {
            const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
            if (!token) {
                return res.status(403).json({ error: 'Aucun token fourni' });
            }

            const decodedToken = await admin.auth().verifyIdToken(token);
            if (!decodedToken) {
                return res.status(403).json({ error: 'Token invalide' });
            }

            const { rows } = await pool.query('SELECT * FROM products');
            res.status(200).json(rows);
        } else {
            res.status(405).json({ error: 'Méthode utilisée non autorisée' });
        }
    } catch (err) {
        console.error(err);
        if (err.code === 'auth/id-token-expired' || err.code === 'auth/argument-error') {
            res.status(403).send('Token invalide ou expiré');
        } else {
            res.status(500).send('Erreur lors de la récupération des produits');
        }
    }
};
