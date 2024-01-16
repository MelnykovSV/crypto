
import CoinChartModule from "@/components/CoinChartModule";

interface ICoinPageProps {
  params: {
    coin: string;
  };
}

export default function CoinPage({ params: { coin } }: ICoinPageProps) {
  return (
    <div>
      <h1>{coin}</h1>

      <CoinChartModule />
    </div>
  );
}
