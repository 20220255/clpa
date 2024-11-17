import styled from 'styled-components';
import { FaHome } from "react-icons/fa"
import { IoInformationCircle } from "react-icons/io5";
import { BiSolidWasher } from "react-icons/bi";
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

export const BottomNavbarDiv = styled.div`
    position: fixed;
    bottom: 0px;
    left: 0px;
    z-index: 50;
    width: 100%;
    height: 4rem;
    box-shadow: 0 0px 80px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    --tw-bg-opacity: 1;
    background-color: rgb(173 224 247 / var(--tw-bg-opacity));
    border-top-width: 1px;
    --tw-border-opacity: 1;
    border-color: rgb(229 231 235 / var(--tw-border-opacity));
`;

export const BottomNavbarBorder = styled.div`
    --tw-shadow-color: hsl(var(--border));
    --tw-shadow: var(--tw-shadow-colored);
    display: grid;
    height: 100%; 
    max-width: 32rem;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    margin-left: auto;
    margin-right: auto;
    font-weight: 500;
`;

export const BottomNavbarButton = styled.button`
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-left: 1.25rem /* 20px */;
    padding-right: 1.25rem /* 20px */;

    &:hover {
        // --tw-bg-opacity: 1;
        // background-color: rgb(37 29 255 / var(--tw-bg-opacity, 1));
        // --tw-bg-opacity: 1;
        // background-color: rgb(173 224 247 / var(--tw-bg-opacity, 1));
        //    --tw-bg-opacity: 1;
        // background-color: rgb(30 41 59 / var(--tw-bg-opacity, 1))
        --tw-bg-opacity: 1;
        background-color: rgb(173 224 247 / var(--tw-bg-opacity));
    };
`;

export const LightIcon = styled(SunIcon)`
    font-size: 0.875rem /* 14px */;
    line-height: 1.25rem /* 20px */;
    --tw-text-opacity: 1;
    color: rgb(37 99 235 / var(--tw-text-opacity, 1));
`;

export const HomeIcon = styled(FaHome)`
    font-size: 0.875rem /* 14px */;
    line-height: 1.25rem /* 20px */;
    --tw-text-opacity: 1;
    color: rgb(37 99 235 / var(--tw-text-opacity, 1));
`;

export const InfoIcon = styled(IoInformationCircle)`
    font-size: 0.875rem /* 14px */;
    line-height: 1.25rem /* 20px */;
    --tw-text-opacity: 1;
    color: rgb(37 99 235 / var(--tw-text-opacity, 1));
`;

export const WasherIcon = styled(BiSolidWasher)`
    font-size: 0.875rem /* 14px */;
    line-height: 1.25rem /* 20px */;
    --tw-text-opacity: 1;
    color: rgb(37 99 235 / var(--tw-text-opacity, 1));
`;

export const BottomNavBarSpan = styled.span`
   font-size: 0.875rem /* 14px */;
    line-height: 1.25rem /* 20px */; 
    --tw-text-opacity: 1;
    color: rgb(37 99 235 / var(--tw-text-opacity, 1));
`;