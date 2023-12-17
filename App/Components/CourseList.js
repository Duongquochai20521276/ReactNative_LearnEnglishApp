import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import GlobalApi from '../Shared/GlobalApi';
import { FlatList } from 'react-native';
import Colors from '../Shared/Colors';
import { useNavigation } from '@react-navigation/native';

export default function CourseList({ type }) {
  const [courseList, setCourseList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getCourseList();
  }, []);

  const getCourseList = async () => {
    try {
      const resp = (await GlobalApi.getCourseList(type)).data;

      // Check if resp.data is defined
      const result = resp.data ? resp.data.map((item) => ({
        id: item.id,
        name: item.attributes.name,
        description: item.attributes.description,
        image: item.attributes.image.data.attributes.url,
        Topic: item.attributes.Topic,
      })) : [];

      setCourseList(result);
    } catch (error) {
      console.error("Error fetching course list:", error);
      // Handle error appropriately, e.g., show an error message to the user
    }
  };

  const onPressCourse = (course) => {
    navigation.navigate('course-detail', {
      courseData: course,
      courseType: 'text',
    });
  };

  return (
    <View style={{ marginTop: 10 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          textTransform: 'capitalize',
          marginBottom: 3,
        }}
      >
        {type} Course
      </Text>

      <FlatList
        data={courseList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              backgroundColor: Colors.white,
              marginRight: 10,
              borderRadius: 10,
            }}
            onPress={() => onPressCourse(item)}
          >
            <Image
              source={{ uri: item.image }}
              style={{
                width: 180,
                height: 100,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                resizeMode: 'cover',
              }}
            />
            <View style={{ padding: 10 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                {item.name}
              </Text>
              <Text style={{ color: Colors.gray, fontWeight: '300' }}>
                {item.Topic?.length || 0} Lessons
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
