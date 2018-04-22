var err_handler = function(err, obj) {
	if(err) throw err;
}

var async_wrapper = (fn) => (...args) => fn(...args).catch(args[2]);



module.exports.err_handler = err_handler;
module.exports.async_wrapper = async_wrapper;