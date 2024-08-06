document.addEventListener('DOMContentLoaded', () => {
    const highlightDates = {
        "五月": [8, 10, 12, 25, 31],
        "六月": [2, 5],
        "七月": [29, 30],
        "八月": [1, 2, 5],
        // 添加其他月份的有md笔记的日期
    };

    const greenHighlightDates = {
        "三月": [21, 22, 24],
        "四月": [20, 24],
        "五月": [15, 22, 24, 29],
        "六月": [7],
        // 添加其他月份的绿色有上课日期
    };

    const months = [
        { name: "一月", days: 31 },
        { name: "二月", days: 29 },
        { name: "三月", days: 31 },
        { name: "四月", days: 30 },
        { name: "五月", days: 31 },
        { name: "六月", days: 30 },
        { name: "七月", days: 31 },
        { name: "八月", days: 31 },
        { name: "九月", days: 30 },
        { name: "十月", days: 31 },
        { name: "十一月", days: 30 },
        { name: "十二月", days: 31 }
    ];

    function generateCalendar(monthIndex, days) {
        const monthName = months[monthIndex].name;
        const tbody = document.createElement('tbody');
        tbody.id = monthName;
        
        let date = 1;
        for (let i = 0; i < 6; i++) { // 6行
            const row = document.createElement('tr');

            for (let j = 0; j < 7; j++) { // 7列
                const cell = document.createElement('td');
                if (i === 0 && j < new Date(2024, monthIndex, 0).getDay()) {
                    cell.innerHTML = "";
                } else if (date > days) {
                    break;
                } else {
                    cell.innerHTML = date;
                    const year = 2024;
                    const month = (monthIndex + 1).toString().padStart(2, '0');
                    const day = date.toString().padStart(2, '0');
                    const fullDate = new Date(year, monthIndex, date);

                    const highlight = highlightDates[monthName] && highlightDates[monthName].includes(date);
                    const greenHighlight = greenHighlightDates[monthName] && greenHighlightDates[monthName].includes(date);
                    const isAfterAug5 = fullDate >= new Date(2024, 7, 5); // 比较日期是否在2024年8月5日之后（包括当日）

                    if (highlight || greenHighlight) {
                        let link;
                        if (isAfterAug5) {
                            link = `https://github.com/zxh111222/JavaProject-maven/tree/main/src/main/java/day${year}${month}${day}`;
                            if (highlight) {
                                link += '/md';
                            }
                        } else {
                            link = `https://github.com/zxh111222/javaProject/tree/master/src/day${year}${month}${day}`;
                            if (highlight) {
                                link += '/md';
                            }
                        }
                        cell.classList.add(highlight ? 'highlight' : 'green-highlight');
                        cell.addEventListener('click', () => {
                            window.open(link, '_blank');
                        });
                    }
                    date++;
                }
                row.appendChild(cell);
            }

            tbody.appendChild(row);
        }
        return tbody;
    }

    const calendarContainer = document.getElementById('calendars');

    for (let i = 0; i < months.length; i++) {
        const monthDiv = document.createElement('div');
        monthDiv.classList.add('month');
        
        const monthTitle = document.createElement('h2');
        monthTitle.innerText = months[i].name;
        monthDiv.appendChild(monthTitle);
        
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
        const daysOfWeek = ["一", "二", "三", "四", "五", "六", "日"];
        for (const day of daysOfWeek) {
            const th = document.createElement('th');
            th.innerText = day;
            headerRow.appendChild(th);
        }
        
        thead.appendChild(headerRow);
        table.appendChild(thead);
        
        const tbody = generateCalendar(i, months[i].days);
        table.appendChild(tbody);
        
        monthDiv.appendChild(table);
        calendarContainer.appendChild(monthDiv);
    }
});
