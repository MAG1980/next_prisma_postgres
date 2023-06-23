"use client"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Salads = () => {
    return (
        <div className="container">
            <h1>Кафе-бар</h1>
            <h3>салаты</h3>
            <div className="breakfast_menu">
                <Card style={{ width: '25rem' }}>
                    <Card.Img variant="top" src="/images/salads/salads1.jpeg" />
                    <Card.Body>
                        <Card.Title>САЛАТ КОУЛ СЛОУ</Card.Title>
                        <Card.Text>
                        Витаминный салат из свежей капусты и моркови с оригинальной майонезной заправкой
                        </Card.Text>
                        <Button variant="primary">230 р.</Button>
                    </Card.Body>
                </Card>
                <Card style={{ width: '25rem' }}>
                <Card.Img variant="top" src="/images/salads/salads2.jpeg" />
                    <Card.Body>
                        <Card.Title>САЛАТ ЦЕЗАРЬ С КУРИЦЕЙ</Card.Title>
                        <Card.Text>
                        Традиционный салат с кусочками филе, листьями салата и соусом Цезарь
                        </Card.Text>
                        <Button variant="primary">370 р.</Button>
                    </Card.Body>
                </Card>
                <Card style={{ width: '25rem' }}>
                <Card.Img variant="top" src="/images/salads/salads3.jpg" />
                    <Card.Body>
                        <Card.Title>САЛАТ ДАЧНЫЙ</Card.Title>
                        <Card.Text>
                        Лёгкий салат из свежих овощей и зелени с сыром фета и соусом юдзу
                        </Card.Text>
                        <Button variant="primary">370 р.</Button>
                    </Card.Body>
                </Card>
            </div>
        </div>

    )
}

export default Salads;