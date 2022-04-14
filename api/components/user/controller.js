const store = require('../../../store/dummy');
const auth = require('../auth');

const TABLA = 'user';

module.exports = (injectedStore) => {
	let store = injectedStore;

	if (!store) {
		store = require('../../../store/dummy');
	}

	const list = () => {
		return store.list(TABLA);
	};

	const get = (id) => {
		return store.get(TABLA, id);
	};

	const upsert = async(body)=> {
		const user = {
			name: body.name,
			username: body.username,
		};

		if (body.id) {
			user.id = body.id;
		} else {
			user.id = '123456';
		}

		if (body.password || body.username) {
			await auth.upsert({
				id: user.id,
				username: user.username,
				password: body.password,
			});
		}

		return store.upsert(TABLA, user);
	}

	return {
		list,
		get,
		upsert
	};
};