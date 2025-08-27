import "./Chip.css";

import { ReactNode } from "react";

type ChipProps = {
    iconName: string;
    children?: ReactNode;
}

export const Chip = ({ iconName, children }: ChipProps) =>
    <div className="chip">
        <div className={`nf nf-${iconName} chip-icon`} />
        {children}
    </div>