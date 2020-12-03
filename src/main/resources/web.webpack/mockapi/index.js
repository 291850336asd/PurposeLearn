function before(app){
    app.get('/api/aa', function(req, res) {
        res.json({ custom: 'get / response' });
    });
    app.post('/api/aa', function(req, res) {
        res.json({ custom: 'post response' });
    });
};

module.exports = {
    before
}