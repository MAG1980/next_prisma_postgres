import {ReactElement} from "react";
// import jsonServerProvider from 'ra-data-json-server';
import {Admin, ListGuesser, Resource} from "react-admin";
import {dataProvider} from "@/admin/dataProvider"
import {GoodShow} from "@/admin/GoodShow";
import {GoodList} from "@/admin/GoodList";
// const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const App = (): ReactElement => (
    <div>
        <Admin dataProvider={dataProvider}>
            <h1>Admin Panel</h1>
            {/*<Resource name="goods" list={GoodList}/>*/}

            <Resource name="goods" list={ListGuesser}/>

            {/*<Resource name="goods" show={GoodShow}/>*/}
        </Admin>
    </div>

    // <h1>Admin Panel</h1>

);
export default App