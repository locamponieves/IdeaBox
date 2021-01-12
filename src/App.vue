<template>
	<!-- Main container -->
	<div class="container mx-auto p-4">
		<!-- Main box -->
		<div class="w-full bg-gray-100 shadow-lg p-4 rounded-lg">
			<h1 class="mb-5 text-4xl text-center">IdeaBox</h1>
		
			<!-- Add idea -->
			<AddIdea :user='user' @do-login="doLogin" @do-logout="doLogout" @add-idea="addIdea"/>
			<!-- End of add idea -->

			<!-- Idea item -->
			<AppIdea v-for="(idea, $index) in ideas" :key="$index" :idea="idea" />
			<!-- End idea item -->
		</div>
		<!-- End of main box -->
	</div>
	<!-- End of main container -->
</template>

<script>
	import AppIdea from '@/components/AppIdea.vue';
	import AddIdea from '@/components/AddIdea.vue';
	import { ref } from 'vue';
	import { auth, db, firebase } from '@/firebase.js';

	export default {
		name: "App",
		
		setup() {
			const ideas = ref([]);

			let user = ref(null);

			// Obtengo información sobre la autenticación
			auth.onAuthStateChanged(async auth => (user.value = auth ? auth : null));

			db.collection('ideas').onSnapshot(
				snapshot => {
					const newIdeas = [];

					snapshot.docs.forEach(doc => {
						let { name, use, userName, votes } = doc.data();

						let id = doc.id;

						newIdeas.push({
							name, use, userName, votes, id
						});
					});

					ideas.value = newIdeas;
				},

				error => console.log(error)
			);

			const doLogin = async () => {
				// Cargamos el proveedor con Google
				var provider = new firebase.auth.GoogleAuthProvider();

				try {
					// Intentamos autenticarnos con este proveedor
					await auth.signInWithPopup(provider);
				} catch (error) {
					// Mostramos el error por pantalla
					console.log(error);
				}
			}

			const doLogout = async () => {
				try {
					await auth.signOut();
				} catch (error) {
					console.log(error);
				}
			}

			const addIdea = async data => {
				try {
					await db.collection("ideas").add({
						name     : data.value,
						user     : user.value.uid,
						userName : user.value.displayName,
						votes    : 0
					});
				} catch (error) {
					console.log(error);
				}
			};

			return { ideas, user, doLogin, doLogout, addIdea };
		},

		components: {
			AppIdea,
			AddIdea
		}
	};
</script>

<style>
	.user-actions {
		@apply mt-2 text-center;
	}

	.user-actions a {
		font-weight: bold;
		text-decoration: underline;
	}
</style>