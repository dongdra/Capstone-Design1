import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { DataTable } from 'react-native-paper';
import axios from 'axios';
import { BarChart } from 'react-native-chart-kit';

const StatisticsPage = () => {
  const [feedback, setFeedback] = useState([]);
  const [chartData, setChartData] = useState({
    labels: ['정확성', '편리성', '만족도', '좋아요', '싫어요'],
    datasets: [{ data: [0, 0, 0, 0, 0] }],
  });
  const [page, setPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get('http://172.30.1.79:3000/api/feedbackall');
        const data = response.data;
        setFeedback(data);
        calculateAverages(data);
        calculateLikesDislikes(data);
      } catch (error) {
        console.error('피드백 데이터를 불러오는 데 실패했습니다:', error);
      }
    };

    fetchFeedback();
  }, []);

  useEffect(() => {
    setPage(0); // 데이터 업데이트 시 첫 페이지로 리셋
  }, [feedback]);

  const calculateAverages = (data) => {
    const totals = data.reduce(
      (acc, cur) => {
        acc[0] += cur.accuracy;
        acc[1] += cur.convenience;
        acc[2] += cur.satisfaction;
        return acc;
      },
      [0, 0, 0]
    );
    const averages = totals.map(total => total / data.length);
    setChartData(prevState => ({
      ...prevState,
      datasets: [{ data: [...averages, prevState.datasets[0].data[3], prevState.datasets[0].data[4]] }]
    }));
  };

  const calculateLikesDislikes = (data) => {
    const counts = data.reduce(
      (acc, cur) => {
        if (cur.rating === '좋아요') acc[0]++;
        if (cur.rating === '싫어요') acc[1]++;
        return acc;
      },
      [0, 0]
    );
    setChartData(prevState => ({
      ...prevState,
      datasets: [{ data: [...prevState.datasets[0].data.slice(0, 3), counts[0], counts[1]] }]
    }));
  };

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, feedback.length);
  const numberOfPages = Math.ceil(feedback.length / itemsPerPage);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>쓰레기통 앱 현황</Text>
      <BarChart
        data={chartData}
        width={350}
        height={220}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16
          },
          barPercentage: 0.5,
        }}
        style={styles.graphStyle}
      />
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>ID</DataTable.Title>
          <DataTable.Title numeric>정확성</DataTable.Title>
          <DataTable.Title numeric>편리성</DataTable.Title>
          <DataTable.Title numeric>만족도</DataTable.Title>
          <DataTable.Title numeric>상태</DataTable.Title>
        </DataTable.Header>
        {feedback.slice(from, to).map((item, index) => (
          <DataTable.Row key={item.id}>
            <DataTable.Cell>{item.id}</DataTable.Cell>
            <DataTable.Cell numeric>{item.accuracy}</DataTable.Cell>
            <DataTable.Cell numeric>{item.convenience}</DataTable.Cell>
            <DataTable.Cell numeric>{item.satisfaction}</DataTable.Cell>
            <DataTable.Cell numeric>{item.rating}</DataTable.Cell>
          </DataTable.Row>
        ))}
        <View style={styles.paginationContainer}>
          <DataTable.Pagination
            page={page}
            numberOfPages={numberOfPages}
            onPageChange={(newPage) => setPage(newPage)}
            label={`${from + 1}-${to} of ${feedback.length}`}
          />
        </View>
      </DataTable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  graphStyle: {
    marginVertical: 8,
    borderRadius: 16,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 3,
  },
});

export default StatisticsPage;
