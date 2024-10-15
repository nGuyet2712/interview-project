import { ReactNode } from "react";
import LogoIcon from "../assets/icons/LogoIcon";

interface AppLayoutProps {
  children: ReactNode;
}

/**
 * Render a header section with a logo and government text, followed by the content
 * provided as children.
 * @component
 * @param {ReactNode} props.children - The child elements that will be rendered within the layout.
 * @returns {React.ReactElement} The rendered app layout element.
 */
function AppLayout({ children }: AppLayoutProps): React.ReactElement {
  return (
    <div>
      <div className="md:px-[160px] sm:px-[80px] px-[30px] flex gap-[8px] py-[4px] bg-[#F0F0F0]">
        <LogoIcon />
        <p className="text-[9.89px] text-[#5B5B5B]">
          An Official Website of the
          <span className="font-semibold"> Singapore Government</span>
        </p>
      </div>
      {children}
    </div>
  );
}

export default AppLayout;
