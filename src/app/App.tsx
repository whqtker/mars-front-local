// import { useState } from 'react';
import './ui/App.css';

function App() {
    // fetch(import.meta.env.VITE_CORE_FRONT_BASE_URL + 'api/v1/test')
    //     .then((res) => res.json())
    //     .then((data) => console.log(data));

    console.log(import.meta.env.VITE_CORE_FRONT_BASE_URL);
    console.log(import.meta.env.VITE_CORE_API_BASE_URL);

    return (
        <>
            <div>Hello World!!</div>
        </>
    );
}

export default App;
