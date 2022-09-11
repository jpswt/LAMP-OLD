let express = require('express');
const router = express.Router();
let requestController = require('../controllers/requests');
let auth = require('../middleware/auth');

router.get(
	'/users/volRequest',
	auth.verifyJWT,
	requestController.sentVolRequests
);

router.get(
	'/users/orgRequest',
	auth.verifyJWT,
	auth.verifyOrg,
	requestController.receivedOrgRequests
);

router.post(
	'/users/sendRequest',
	auth.verifyJWT,
	requestController.sendRequest
);

router.put(
	'/users/acceptReq/:id',
	auth.verifyJWT,
	auth.verifyOrg,
	requestController.acceptRequest
);

router.put(
	'/users/declineReq/:id',
	auth.verifyJWT,
	auth.verifyOrg,
	requestController.declineRequest
);

router.delete(
	'/users/deleteReq/:id',
	auth.verifyJWT,
	requestController.deleteRequest
);

module.exports = router;
