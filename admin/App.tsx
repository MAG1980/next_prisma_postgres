import {ReactElement} from "react";
// import jsonServerProvider from 'ra-data-json-server';
import {Admin, EditGuesser, ListGuesser, Resource, ShowGuesser} from "react-admin";
import {dataProvider} from "@/admin/dataProvider"
import {ListGood} from "@/admin/components/Good/ListGood";
import {CreateGood} from "@/admin/components/Good/CreateGood";
import {EditGood} from "@/admin/components/Good/EditGood";
import {CreateClient} from "@/admin/components/Client/CreateClient";
import {EditClient} from "@/admin/components/Client/EditClient";
import {CreateGoodsImage} from "@/admin/components/GoodsImage/CreateGoodsImage";
import {EditGoodsImage} from "@/admin/components/GoodsImage/EditGoodsImage";
// const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const App = (): ReactElement => (
    <div>
        <h1>Admin Panel</h1>
        <Admin dataProvider={dataProvider}>
            <Resource name="clients" list={ListGuesser}  create={CreateClient} edit={EditClient} show={ShowGuesser} recordRepresentation="id" />
            <Resource name="goods" list={ListGuesser} create={CreateGood} edit={EditGood} show={ShowGuesser} recordRepresentation="name" />
            <Resource name="goods-images" list={ListGuesser} create={CreateGoodsImage} edit={EditGoodsImage} show={ShowGuesser} recordRepresentation="id" />
        </Admin>
    </div>
);
export default App