import "../App.css";
import { useConnection } from "../states/connection";
import HeaderPage from "./header/HeaderPage";

function Home() {
  const { connection } = useConnection();
  console.log("connection", connection);
  return (
    <>
      <HeaderPage/>
      <img src="../../img/banner.06d067e1.png" />
      <section className="px-14">
        <h2 className="py-10 text-3xl font-bold">Crypto Pops Society</h2>
        <p className="text-slate-500 text-xl">
          The Crypto Pops Society is a collection of 5.000 unique Pops with
          64×64 pixel art images, generated algorithmically on the Binance Smart
          Chain (BCS). Most are Human, but there are a few rarer types mixed in:
          Zombies, Animals, Robot and even the odd Constellation. There are
          exactly 5,000 of them, each with their own ostensible personality and
          unique combination of distinctive, randomly generated features.
        </p>
        <h2 className="py-10 text-3xl font-bold">The ability to control</h2>
        <p className="text-slate-500 text-xl">
          Developing blockchain projects is different from conventional
          projects. Developers after announcing and releasing the product will
          almost no longer have the right to interfere and modify. It is the
          investors who will be responsible for the changes they have made to
          the smart contract. At the same time, the fixed number of 5,000 Pops
          makes Pops valuable and limited. Even if creators could make more
          Pops, they would not be recognized in the market. This has proven
          equality and fairness for everyone when entering this playground.
          Because once created, the manufacturers locked it up and the ownership
          control code was injected into the BSC blockchain network. By the time
          the Pops are released on the blockchain, the producer has lost his
          control to create more or own the Pops.
        </p>
      </section>

      <footer></footer>
    </>
  );
}

export default Home;
