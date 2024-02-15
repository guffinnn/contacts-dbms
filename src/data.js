export const ROWS = {
    id: "Номер",
    from: "Откуда",
    to: "Куда",
    stops: "Маршрут",
    days: "Курсирование",
    type_of_transport: "Вид транспорта"
};

export const TYPES = {
    id: "string",
    from: "string",
    to: "string",
    stops: "string",
    days: "string",
    type_of_transport: "string"
};

export const OPTIONS = {
    "по номеру": "__name__",
    "по станциям": "stops",
    "по отправлению": "from",
    "по прибытию": "to",
    "по транспорту": "type_of_transport"
};

export const AUTH_ROWS = {
    email: "Эл. Почта",
    password: "Пароль"
};

export const MODAL_TYPES = ['addRoute', 'editRoute', 'auth'];

export const DAYS_COMBO = {
    "пвсчп св": "Каждый день",
    "пвсчп": "По будним дням",
    "св": "По выходным дням"
};

export const DAYS_BEFORE = {
    'п': 'Понедельник',
    'в': 'Вторник',
    'с': 'Среда',
    'ч': 'Четверг'
};

export const DAYS_AFTER = {
    'п': 'Пятница',
    'с': 'Суббота',
    'в': 'Воскресенье'
}