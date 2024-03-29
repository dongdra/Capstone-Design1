//Calendar.js
import React, { PureComponent } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    calendar: {
        height :"100%",
        borderBottomColor: "#BDBDBD",
        backgroundColor: "white",
    },

    week: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },

    dayOuter: {
        flex: 1,
    },

    dayInner: {
        paddingTop: 12,
        paddingRight: 12,
        paddingBottom: 12,
        paddingLeft: 8,
        backgroundColor: "white",
        borderBottomWidth: 3,
        borderStyle: "solid",
        borderColor: "white",
    },

    todayDayInner: {
        borderColor: "#BF360C"
    },

    dayText: {
        textAlign: "right",
    },

    dayWeekendText: {
        color: "#BF360C",
    },

    bar: {
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    barText: {
        color: "#424242",
    },

    barButton: {
        backgroundColor: "white",
        padding: 10,
    },

    schadedText: {
        color: "#AAAAAA",
    }
});

export default class Calendar extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: props.date
        };
    }

    static get defaultProps() {
        return {
            date: new Date(),
            onDateSelect: null,
            onPrevButtonPress: null,
            onNextButtonPress: null,
            weekFirstDay: 0,
            dayNames: [
                "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
            ],
            monthNames: [
                "1월", "2월", "3월",
                "4월", "5월", "6월",
                "7월", "8월", "9월",
                "10월", "11월", "12월"
            ]
        };
    }

    static get propTypes() {
        return {
            date: PropTypes.object,
            onDateSelect: PropTypes.func,
            onPrevButtonPress: PropTypes.func,
            onNextButtonPress: PropTypes.func,
            dayNames: PropTypes.array,
            monthNames: PropTypes.array,
            weekFirstDay: PropTypes.number,
        };
    }

    handleNextButtonPress = () => {
        this.setState(prevState => ({
            currentDate: new Date(prevState.currentDate.getFullYear(), prevState.currentDate.getMonth() + 1, 1)
        }));
    }

    handlePrevButtonPress = () => {
        this.setState(prevState => ({
            currentDate: new Date(prevState.currentDate.getFullYear(), prevState.currentDate.getMonth() - 1, 1)
        }));
    }

    handleDayPress = (dateNumber) => {
        if (this.props.onDateSelect !== null) {
            const month = this.state.currentDate.getMonth();
            const year  = this.state.currentDate.getFullYear();
            const selectedDate = new Date(year, month, dateNumber);

            this.props.onDateSelect(selectedDate);
        }
    }

    
    // 각 월의 일수를 계산하는 함수
    getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    }

    renderBar() {
        const month = this.state.currentDate.getMonth();
        const year = this.state.currentDate.getFullYear();
        const monthName = this.props.monthNames[month];

        return (
            <View style={styles.bar}>
                <TouchableOpacity style={styles.barTouchable} onPress={this.handlePrevButtonPress}>
                    <View style={[styles.barButton, styles.barButtonPrev]}>
                        <Text>&larr;</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.barMonth}>
                    <Text style={styles.barText}>{monthName + " "}</Text>
                </View>

                <View style={styles.barYear}>
                    <Text style={styles.barText}>{year}</Text>
                </View>

                <TouchableOpacity style={styles.barTouchable} onPress={this.handleNextButtonPress}>
                    <View style={[styles.barButton, styles.barButtonNext]}>
                        <Text>&rarr;</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    renderDayNames() {
        const elements = [];

        for (let i = 0; i < 7; i++) {
            const dayIndex = (this.props.weekFirstDay + i) % 7;
            elements.push(
                <View key={i} style={styles.dayInner}>
                    <Text style={[styles.shadedText, styles.dayText]}>
                        {this.props.dayNames[dayIndex]}
                    </Text>
                </View>
            );
        }

        return (
            <View style={styles.week}>
                {elements}
            </View>
        );
    }

    renderCalendarDay(index, dateNumber) {
        const weekDay = (index + this.props.weekFirstDay) % 7;
        const isWeekend = weekDay === 0 || weekDay  === 6;
    
        const today = new Date();
        const isToday = dateNumber === today.getDate() &&
                        this.state.currentDate.getMonth() === today.getMonth() &&
                        this.state.currentDate.getFullYear() === today.getFullYear();
    
        return (
            <View key={dateNumber} style={styles.dayOuter}>
                <TouchableOpacity onPress={() => this.handleDayPress(dateNumber)}>
                    <View style={[styles.dayInner, isToday ? styles.todayDayInner : {}]}>
                        <Text style={[styles.dayText, isWeekend ? styles.dayWeekendText : {}]}>
                            {dateNumber}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    renderCalendarDayEmpty(dateNumber) {
        return (
            <View key={dateNumber} style={styles.dayOuter}>
                <View style={styles.dayInner}>
                    <Text style={styles.dayText}> </Text>
                </View>
            </View>
        );
    }

    renderCalendarWeek(startDateNumber, weekOffset, daysLeft) {
        const days = [];
        const weekKey = startDateNumber;

        for (let i = 0; i < weekOffset; i++) {
            days.push(this.renderCalendarDayEmpty(- weekOffset + i));
        }

        let i = weekOffset;
        for (; i < 7 && daysLeft > 0; i++) {
            days.push(this.renderCalendarDay(i, startDateNumber++));
            daysLeft--;
        }

        for (; i < 7; i++) {
            days.push(this.renderCalendarDayEmpty(startDateNumber++));
        }

        return (
            <View key={weekKey} style={styles.week}>
                {days}
            </View>
        );
    }

    render() {
        const year = this.state.currentDate.getFullYear();
        const month = this.state.currentDate.getMonth();

        // 해당 월의 일 수를 계산
        let daysInMonth = this.getDaysInMonth(year, month);
        let startDateNumber = 1;
        let monthFirstDayOfWeek = new Date(year, month, 1).getDay();
        monthFirstDayOfWeek = (monthFirstDayOfWeek - this.props.weekFirstDay + 7) % 7;

        const weeks = [];

        if (monthFirstDayOfWeek !== 0) {
            weeks.push(this.renderCalendarWeek(startDateNumber, monthFirstDayOfWeek, daysInMonth));
            daysInMonth -= (7 - monthFirstDayOfWeek) % 7;
            startDateNumber += (7 - monthFirstDayOfWeek) % 7;
        }

        while (daysInMonth > 0) {
            const daysInWeek = Math.min(7, daysInMonth);
            weeks.push(this.renderCalendarWeek(startDateNumber, 0, daysInWeek));
            startDateNumber += daysInWeek;
            daysInMonth -= daysInWeek;
        }

        return (
            <View style={[styles.calendar]}>
                {this.renderBar()}
                {this.renderDayNames()}
                {weeks}
            </View>
        );
    }
}

