"use client"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const BreakfastMenu = () => {

    return (
        <div className="container">
            <h1>Кафе-бар</h1>
            <h3>Завтраки</h3>
            <div className="breakfast_menu">
                <Card style={{ width: '25rem' }}>
                    <Card.Img variant="top" src="/images/breakfast/photo.jpg" />
                    <Card.Body>
                        <Card.Title>БЕКОНЫЧ</Card.Title>
                        <Card.Text>
                            Бургер с яичницей, обжаренным до золотистой корочки беконом и сырным соусом
                        </Card.Text>
                        <Button variant="primary">310 р.</Button>
                    </Card.Body>
                </Card>
                <Card style={{ width: '25rem' }}>
                    <Card.Img variant="top" src="/images/breakfast/photo2.jpg" />
                    <Card.Body>
                        <Card.Title>ЭГГ БУРГЕР</Card.Title>
                        <Card.Text>
                            Бургер с котлетой, жареным яйцом, сыром Чеддер и свежими помидорами
                        </Card.Text>
                        <Button variant="primary">350 р.</Button>
                    </Card.Body>
                </Card>
                <Card style={{ width: '25rem' }}>
                    <Card.Img variant="top" src="/images/breakfast/photo3.jpg" />
                    <Card.Body>
                        <Card.Title>СЫРНИКИ</Card.Title>
                        <Card.Text>
                            Нежные творожные сырники. Подаются со сметаной и вареньем из спелой вишни
                        </Card.Text>
                        <Button variant="primary">249 р.</Button>
                    </Card.Body>
                </Card>
            </div>
        </div>

    )
}

export default BreakfastMenu;



