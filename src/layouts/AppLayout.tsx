import SearchBar from "../components/SearchBar";
import ResultsList from "../pages/ResultsPage/components/ResultsList";
import logo from "../../public/logo.svg";

function AppLayout() {
  return (
    <div>
      <div className="md:px-[160px] sm:px-[80px] px-[30px] flex gap-[8px] py-[4px] bg-[#F0F0F0]">
        <img className="w-[16px] " src={logo} />
        <p className="text-[9.89px] text-[#5B5B5B]">
          An Official Website of the
          <span className="font-semibold">Singapore Government</span>
        </p>
      </div>
      <SearchBar />
      <ResultsList />
    </div>
  );
}

export default AppLayout;
