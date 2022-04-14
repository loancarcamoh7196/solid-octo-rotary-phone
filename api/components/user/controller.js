const store = require('../../../store/dummy');

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

	const upsert = (body)=> {
		const user = {
			name: body.name,
		};

		if (body.id) {
			user.id = body.id;
		} else {
			user.id = null;
		}

		return store.upsert(TABLA, user);
	}

	return {
		list,
		get,
		upsert
	};
};