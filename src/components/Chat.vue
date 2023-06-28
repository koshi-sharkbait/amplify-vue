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
    <input
      class="message-input"
      placeholder="Enter a message (send with Shift+Enter)"
      v-model="content"
      @keydown.enter.shift="sendMessage"
    />
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
      if (event.keyCode !== 13 || !content.value) return;

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
