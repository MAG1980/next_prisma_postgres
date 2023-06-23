"use client"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Combo = () => {
    return (
        <div className="container">
            <h1>Кафе-бар</h1>
            <h3>комбо</h3>
            <div className="breakfast_menu">
                <Card style={{ width: '25rem' }}>
                    <Card.Img variant="top" src="/images/combo/combo1.jpg" />
                    <Card.Body>
                        <Card.Title>БРЯНСКИЙ СЕТ ВЫГОДНО</Card.Title>
                        <Card.Text>
                        Бургер с мини-котлетой и огурцами + картофель фри 110г + Рич Кола 330 мл
                        </Card.Text>
                        <Button variant="primary">490 р.</Button>
                    </Card.Body>
                </Card>
                <Card style={{ width: '25rem' }}>
                <Card.Img variant="top" src="/images/combo/combo2.jpg" />
                    <Card.Body>
                        <Card.Title>ЧИКЕН ЭГГ ВЫГОДНО</Card.Title>
                        <Card.Text>
                        Бургер с куриной мини-котлетой, яйцом и овощами + картофель фри + Рич Кола 330 мл
                        </Card.Text>
                        <Button variant="primary">490 р.</Button>
                    </Card.Body>
                </Card>
                <Card style={{ width: '25rem' }}>
                <Card.Img variant="top" src="/images/combo/combo3.jpg" />
                    <Card.Body>
                        <Card.Title>COUPLE СЕТ</Card.Title>
                        <Card.Text>
                        Dorky Porky+ Чизбургер FARШ+ картофель фри 110г (2 шт)+ Рич Кола 330 мл (2 шт)
                        </Card.Text>
                        <Button variant="primary">1690 р.</Button>
                    </Card.Body>
                </Card>
            </div>
        </div>

    )
}

export default Combo