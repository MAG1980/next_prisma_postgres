"use client"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Burgers = () => {
    return (
        <div className="container">
            <h1>Кафе-бар</h1>
            <h3>БУРГЕРЫ</h3>
            <div className="breakfast_menu">
                <Card style={{ width: '25rem' }}>
                    <Card.Img variant="top" src="/images/burger/burger1.jpg" />
                    <Card.Body>
                        <Card.Title>СОСЕД ПО ДАЧЕ</Card.Title>
                        <Card.Text>
                        Бургер с сочной котлетой из мраморной говядины, со свежим хрустящим огурцом, редисом, зеленью и листьями салата латук, с соусом чесночный ранч
                        </Card.Text>
                        <Button variant="primary">510 р.</Button>
                    </Card.Body>
                </Card>
                <Card style={{ width: '25rem' }}>
                <Card.Img variant="top" src="/images/burger/burger2.jpg" />
                    <Card.Body>
                        <Card.Title>ЗАВОДНОЙ АНАНАС</Card.Title>
                        <Card.Text>
                        Бургер с двумя сочными котлетами из мраморной говядины, сыром Чеддер, ананасом, приготовленном на гриле, листьями салата и пикантным соусом Карри с манго.
                        </Card.Text>
                        <Button variant="primary">690 р.</Button>
                    </Card.Body>
                </Card>
                <Card style={{ width: '25rem' }}>
                <Card.Img variant="top" src="/images/burger/burger3.jpg" />
                    <Card.Body>
                        <Card.Title>FARШ ДОГ</Card.Title>
                        <Card.Text>
                        Сочная колбаска гриль из натуральной говядины с листьями салата, спелыми томатами, маринованными мини-перчиками с фирменным соусом на пышной булке
                        </Card.Text>
                        <Button variant="primary">450 р.</Button>
                    </Card.Body>
                </Card>
            </div>
        </div>

    )
}

export default Burgers