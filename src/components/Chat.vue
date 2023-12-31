<template>
  <div class="main-contents">
    <div class="message_base">
      <div v-for="message in messages" :key="message.id">
        <div v-bind:class="[message.owner === username ? 'message' : 'message_opponent']">
          {{ message.content }}
        </div>
        <div v-bind:class="[message.owner === username ? 'username' : 'username_opponent']">
          {{ message.owner }}
        </div>
      </div>
    </div>

    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="content" type="text" variant="outlined">
              <template>
                <v-fade-transition leave-absolute>
                  <v-progress-circular v-if="loading" color="info" indeterminate size="24">
                  </v-progress-circular>
                </v-fade-transition>
              </template>
              <template v-slot:append>
                <v-btn @click="sendMessage">
                  Button
                </v-btn>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

  </div>

</template>



<script>
  import { API, graphqlOperation } from '@aws-amplify/api';
  import { useAuthenticator } from '@aws-amplify/ui-vue';
  import { createMessage } from '@/graphql/mutations';
  import { listMessages } from '@/graphql/queries';
  import { onCreateMessage } from '@/graphql/subscriptions';
  import { ref, onBeforeUnmount, onUpdated } from 'vue';

  export default {
    props: {
      username: String,
    },
    setup(props) {
      const messages = ref([]);
      const content = ref('');
      const subscription = ref({});

      const sendMessage = async () => {
        if (!content.value) return;

        const message = {
          id: new Date().getTime() + props.username,
          content: content.value,
        };

        // Mutation(createMessage) の実装 ↓
        API.graphql(graphqlOperation(createMessage, { input: message })).catch((error) => console.warn(error));
        // ↑↑↑↑↑↑
        content.value = '';
      };

      const fetch = async () => {
        // Query(listMessages) の実装 ↓
        API.graphql(graphqlOperation(listMessages, { input: 100 }))
          .then((value) => (messages.value = value.data.listMessages.items.sort((a, b) => (a.id > b.id ? 1 : -1))))
          .catch((error) => console.warn(error));
        // ↑↑↑↑↑↑
      };

      const subscribe = async () => {
        // Subscription(onCreateMessages) の実装 1 ↓
        subscription.value = API.graphql(graphqlOperation(onCreateMessage)).subscribe({
          next: (eventData) => {
            const message = eventData.value.data.onCreateMessage;
            messages.value = [...messages.value, message];
          },
          error: (error) => console.warn(error),
        });
        // ↑↑↑↑↑↑
      };

      const scrollBottom = () => {
        const container = document.querySelector('.message_base');
        container.scrollTop = container.scrollHeight;
      };

      onBeforeUnmount(() => {
        // Subscription(onCreateMessages) の実装 2 ↓
        subscription.value.unsubscribe();
        // ↑↑↑↑↑↑
      });

      onUpdated(() => {
        scrollBottom();
      });

      fetch();
      subscribe();

      return {
        messages,
        content,
        sendMessage,
      };
    },
  };
</script>
