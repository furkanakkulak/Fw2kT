import Editor from '@/components/Editor';
import Head from 'next/head';

const index = () => {
  return (
    <>
      <Head>
        <title>Text Editor</title>
      </Head>
      <main>
        <Editor />
      </main>
    </>
  );
};
export default index;
