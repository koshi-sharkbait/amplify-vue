<template>
  <div class="home">
    <h1>
      Welcome to Amplify Vue Workshop, {{ username }} ! Click
      <a href="https://catalog.workshops.aws/amplify-vue3/ja-JP"> here </a> for hands-on.
    </h1>
    <img src="https://d15nimfww918g4.cloudfront.net/img.png" />
    <p>
      かの Larry Wall は、プログラマの三大美徳として怠惰（Laziness）、短気（Impatence）、傲慢（Hubis）を挙げました。
      ここで「怠惰である」とは、例えば効率化や自動化によって面倒なことを何度もしないで済むようにし、開発の効率を上げることを意味します。
    </p>
    <p>
      AWS では、AWS を使用したスケーラブルなモバイルアプリおよびウェブアプリの作成、設定、実装を容易にする AWS Amplify
      を提供しています。このアプリは AWS Amplify を使って作成したサンプルアプリとなります。
    </p>
    <h3>参考リンク</h3>
    <ul>
      <li>
        <a href="https://aws.amazon.com/jp/builders-flash/202203/amplify-studio-flash-development/?awsf.filter-name=*all"> アプリを爆速で開発 ! AWS Amplify Studio で出来ること。</a>
      </li>
      <li>
        <a href="https://docs.amplify.aws/"> AWS Amplify 公式ドキュメント </a>
      </li>
      <li>
        <a href="https://amplify-sns.workshop.aws/ja/"> Amplify SNS Workshop </a>
      </li>
      <li>
        <a href="https://github.com/aws-amplify-jp/awesome-aws-amplify-ja">AWS Amplify のツール、チュートリアル、記事などのリンク集</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    username: String,
  },
};
</script>
