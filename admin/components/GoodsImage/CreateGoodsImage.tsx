import {Create, NumberInput, ReferenceInput, SimpleForm, TextInput} from "react-admin";

export const CreateGoodsImage = () => {
    return (
        <Create>
            <SimpleForm>
                {/*<ReferenceInput source="userId" reference="users" />*/}
                <ReferenceInput source="goodId" reference="goods"/>
                <TextInput source="link" type="url"/>
                <NumberInput source="fileSize"/>
            </SimpleForm>
        </Create>
    )
}