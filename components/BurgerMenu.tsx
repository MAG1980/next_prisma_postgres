"use client";


import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

const BurgerMenu = () => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <div className="container_menu">
            <h1>Burger Menu</h1>
            <h3>BEST EVER BURGERS</h3>
            <div className="burger_menu">
                <div className="card">
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="300"
                                image="/images/burgers/2.png"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Beefy Burgers
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Great way to make your business appear trust and relevant.
                                </Typography>
                                <Typography variant="h6" color="red">
                                    5$
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button variant="contained">Заказать</Button>
                        </CardActions>
                    </Card>
                </div>

                <div className="card">
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="300"
                                image="/images/burgers/2.png"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Beefy Burgers
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Great way to make your business appear trust and relevant.
                                </Typography>
                                <Typography variant="h6" color="red">
                                    5$
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button variant="contained">Заказать</Button>
                        </CardActions>
                    </Card>
                </div>
                <div className="card">
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="300"
                                image="/images/burgers/2.png"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Beefy Burgers
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Great way to make your business appear trust and relevant.
                                </Typography>
                                <Typography variant="h6" color="red">
                                    5$
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button variant="contained">Заказать</Button>
                        </CardActions>
                    </Card>
                </div>
                <div className="card">
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="300"
                                image="/images/burgers/1.png"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Beefy Burgers
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Great way to make your business appear trust and relevant.
                                </Typography>
                                <Typography variant="h6" color="red">
                                    5$
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button variant="contained">Заказать</Button>
                        </CardActions>
                    </Card>
                </div>
                <div className="card">
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="300"
                                image="/images/burgers/1.png"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Beefy Burgers
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Great way to make your business appear trust and relevant.
                                </Typography>
                                <Typography variant="h6" color="red">
                                    5$
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button variant="contained">Заказать</Button>
                        </CardActions>
                    </Card>
                </div>
                <div className="card">
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="300"
                                image="/images/burgers/1.png"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Beefy Burgers
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Great way to make your business appear trust and relevant.
                                </Typography>
                                <Typography variant="h6" color="red">
                                    5$
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button variant="contained">Заказать</Button>
                        </CardActions>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default BurgerMenu



