import styled from '@emotion/styled';

export const Backdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: var(--backdrop-bg-color);
`;

export const ModalContainer = styled.div`
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: auto;
    background-color: var(--main-bg-color);
    box-shadow: var(--box-shadow);
`;

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px;
`;

export const Title = styled.h1`
    font-size: 15px;
    font-weight: 400;
    text-transform: capitalize;
`;

export const Button = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 30px;
    padding: 0;
    border: none;
    border-radius: 5px;
    background-color: var(--second-bg-color);
    color: var(--second-text-color);
    cursor: pointer;
    transition: color var(--hover-animation);
    &:hover,
    &:focus {
        color: var(--accent-bg-color);
    }
`;