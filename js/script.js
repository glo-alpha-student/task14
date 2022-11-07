'use strict';

const titleName = document.getElementsByTagName('h1')[0];
const startButton = document.getElementsByClassName('handler_btn')[0];
const resetButton = document.getElementsByClassName('handler_btn')[1];
const plusButton = document.querySelector('.screen-btn');
const percentItems = document.querySelectorAll('.other-items.percent');
const numberItems = document.querySelectorAll('.other-items.number');
const range = document.querySelector('.rollback input');
const span = document.querySelector('.rollback .range-value');
const total = document.getElementsByClassName('total-input')[0];
const countOfscreen = document.getElementsByClassName('total-input')[1];
const countOther = document.getElementsByClassName('total-input')[2];
const fullContent = document.getElementsByClassName('total-input')[3];
const countRollback = document.getElementsByClassName('total-input')[4];

let screens = document.querySelectorAll('.screen');

const appData = {

    title: '',
    screens: [],
    adaptive: true,
    screenPrice: 0,
    fullPrice: 0,
    servicesPercent: {},
    servicesNumber: {},
    servicePricePercent: 0,
    servicePriceNumber: 0,
    rollback: 0,
    servicePercentPrice: 0,
    totalScreen: 0,

    addTitle: function () {
        document.title = titleName.textContent;
    },
    init: function () {
        this.addTitle();

        startButton.addEventListener('click', this.start.bind(this));
        resetButton.addEventListener('click', this.reset.bind(this));
        plusButton.addEventListener('click', this.addScreenblock.bind(this));
        range.addEventListener('input', this.addRange.bind(this));
    },
    reset: function () {
        plusButton.disabled = false;

        resetButton.style.display = "none";
        startButton.style.display = "block";

        for (let i = 0; i < screens.length; i++) {
            if (i) {

                screens[i].remove();
            } else {

                const select = screens[i].querySelector('select');
                const input = screens[i].querySelector('input');

                select.disabled = false;
                select.value = '';
                input.disabled = false;
                input.value = '';

            }

        }

        screens = document.querySelectorAll('.screen');

        percentItems.forEach((item) => {

            const check = item.querySelector('input[type=checkbox]');
            check.checked = false;
            check.disabled = false;

        });
        numberItems.forEach((item) => {

            const check = item.querySelector('input[type=checkbox]');
            check.checked = false;
            check.disabled = false;

        });

        this.fullPrice = 0;
        this.rollback = 0;
        this.screenPrice = 0;
        this.screens = [];
        this.servicePercentPrice = 0;
        this.servicePriceNumber = 0;
        this.servicePricePercent = 0;
        this.servicesNumber = {};
        this.servicesPercent = {};
        this.totalScreen = 0;

        range.value = 0;
        span.textContent = 0 + "%";
        range.disabled = false;

        total.value = 0;
        countOther.value = 0;
        fullContent.value = 0;
        countRollback.value = 0;
        countOfscreen.value = 0;
    },
    start: function () {
        plusButton.disabled = true;

        for (let i = 0; i < screens.length; i++) {

            if (screens[i].querySelector('select').value === '' ||
                screens[i].querySelector('input').value === '') {
                alert('no');
                return false;

            }
        }

        startButton.style.display = "none";
        resetButton.style.display = "block";

        range.disabled = true;

        this.addScreens();
        this.addServices();
        this.addPrices();
        this.showResult();
    },
    showResult: function () {
        total.value = this.screenPrice;
        countOther.value = this.servicePricePercent + this.servicePriceNumber;
        fullContent.value = this.fullPrice;
        countRollback.value = this.servicePercentPrice;
        countOfscreen.value = this.totalScreen;
    },
    addRange: function () {
        span.textContent = range.value + "%";
        this.rollback = range.value;
    },
    addScreens: function () {
        screens.forEach((screen, index) => {
            const select = screen.querySelector('select');
            const input = screen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

            this.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value,
                count: +input.value
            });

            select.disabled = true;
            input.disabled = true;

        });
    },
    addServices: function () {
        percentItems.forEach((item) => {

            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesPercent[label.textContent] = +input.value;

            }
            check.disabled = true;
        });
        numberItems.forEach((item) => {

            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesNumber[label.textContent] = +input.value;

            }
            check.disabled = true;
        });
    },
    addScreenblock: function () {
        const cloneScreen = screens[0].cloneNode(true);
        cloneScreen.querySelector('input').value = '';
        screens[screens.length - 1].after(cloneScreen);
        screens = document.querySelectorAll('.screen');
    },
    addPrices: function () {
        for (let myTears of this.screens) {
            this.screenPrice += +myTears.price;
        }
        for (let myTears of this.screens) {
            this.totalScreen += +myTears.count;
        }
        for (let myTears in this.servicesNumber) {
            this.servicePriceNumber += this.servicesNumber[myTears];
        }
        for (let myTears in this.servicesPercent) {
            this.servicePricePercent += this.screenPrice * (this.servicesPercent[myTears] / 100);
        }

        this.fullPrice = this.screenPrice + this.servicePriceNumber + this.servicePricePercent;
        this.servicePercentPrice = this.fullPrice - Math.ceil((this.fullPrice * (this.rollback / 100)));
    },
};

appData.init();