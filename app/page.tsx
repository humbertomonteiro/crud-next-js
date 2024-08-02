import Layout from "./components/Layout";
import Table from "./components/Table";

export default function Home() {
  return (
    <main
      className={`flex justify-center items-center h-screen bg-gradient-to-b from-gray-950 to-gray-800`}
    >
      <Layout>
        <Table />
      </Layout>
    </main>
  );
}
