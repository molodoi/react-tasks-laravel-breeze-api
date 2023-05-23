const PageButton = ({ pg, setPage, current }) => {
    return (
        <a
            className={`${
                pg === current
                    ? "bg-sky-800 text-white disabled:cursor-none"
                    : "bg-white text-gray-900 hover:bg-gray-100 cursor-pointer"
            } relative items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300  focus:z-20 focus:outline-offset-0`}
            onClick={() => setPage(pg)}
        >
            {pg}
        </a>
    );
};

export default PageButton;
