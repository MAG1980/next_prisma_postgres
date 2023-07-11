"use client"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Prisma, Good} from '@prisma/client'

const goodsWithImages = Prisma.validator<Prisma.GoodInclude>()({
    goodsImages: true,
})

export interface IBreakfastMenuProps{
    goods:Good[]
}
const BreakfastMenu = ({goods}) => {

    console.log(goods)

    return (
        <div className="container">
            <h1>Кафе-бар</h1>
            <h3>Завтраки</h3>
            <div className="breakfast_menu">
                {goods.map((good: Good) => (
                    <Card style={{width: '25rem'}}>
                        <Card.Img variant="top" src={good.goodsImages[0].link}/>
                        <Card.Body>
                            <Card.Title>{good.name}</Card.Title>
                            <Card.Text>
                                {good.description}
                            </Card.Text>
                            <Button variant="primary">{good.basePrice} р.</Button>
                        </Card.Body>
                    </Card>
                ))}

            </div>
        </div>

    )
}

export default BreakfastMenu;



