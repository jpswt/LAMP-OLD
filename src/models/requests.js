const helper = require('../helper/promisify');

const sentVolRequests = (userName) => {
	let sql =
		'select org_id, users1.name, tasks.type, tasks.description, start_time, time_span, message, isAccepted, created_on from request join users1 on request.vol_username = users1.username join tasks on tasks.id = request.task_code where vol_username = ? order by created_on desc';
	return helper.promisify(sql, userName);
};

const receivedOrgRequests = (userId) => {
	let sql =
		'select request.id, users1.username, users1.name, users1.email, tasks.type, tasks.description, start_time, message, time_span, isAccepted, created_on from request join users1 on request.vol_username = users1.username join tasks on tasks.id = request.task_code where org_id = ? order by created_on desc';
	return helper.promisify(sql, userId);
};

const sendRequest = (data, userName) => {
	let sql = 'insert into request set ?';
	let params = [data, userName];
	return helper.promisify(sql, params);
};

const acceptRequest = (isAccepted, id) => {
	let sql = 'update request set isAccepted = ? where id = ?';
	let params = [isAccepted, id];
	return helper.promisify(sql, params);
};

const declineRequest = (isAccepted, id) => {
	let sql = 'update request set isAccepted = ? where id = ?';
	let params = [isAccepted, id];
	return helper.promisify(sql, params);
};

const deleteRequest = (id, userName) => {
	let sql = 'delete from request where id = ? and vol_username = ?';
	let params = [id, userName];
	return helper.promisify(sql, params);
};

module.exports = {
	sentVolRequests,
	receivedOrgRequests,
	sendRequest,
	acceptRequest,
	declineRequest,
	deleteRequest,
};
