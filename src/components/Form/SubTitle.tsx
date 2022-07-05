import { ReactNode } from 'react';

type SubtitleProps = {
    children: ReactNode;
}

const SubTitle = ({ children }: SubtitleProps) => <h2 className="text-blue-400 font-bold my-4">{children}</h2>;

export default SubTitle;
