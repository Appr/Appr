function routeLocker(req, res, next) {
    // const sessionid = req.session.passport.user
    // const userid = req.params.userid;
    // sessionid === userid ? next() : res.status(401);
    // if (sessionid === userid){
        console.log('routeLocker triggered   ' + req.url);
        console.log(req.user['anonymous']);
        if (req.user[0] === 'undefined')
            return res.render('/')
        
        if (req.isAuthenticated())
            return next();

        console.log('user not authenticated')

}

module.exports = routeLocker;






// function routeLocker(req, res, next) {
//     // const sessionid = req.session.passport.user
//     // const userid = req.params.userid;
//     // sessionid === userid ? next() : res.status(401);
//     // if (sessionid === userid){
//         next();
//     // } else {
//     //     res.status(401).send();
//     //     console.log('test failed');
//     // }
// }

// module.exports = routeLocker;