const MapArea = () => {
    return (
        <main className="flex-1 bg-white">
            <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-400 flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full mb-3 flex items-center justify-center">
                        🗺️
                    </div>
                    지도가 표시될 영역
                </span>
            </div>
        </main>
    );
};

export default MapArea;
