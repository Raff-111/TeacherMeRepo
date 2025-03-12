import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Modal, TextInput, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter, Link } from 'expo-router';
import { account, database, client } from '@/lib/appwrite';
import { Query } from 'react-native-appwrite';

const Thome = () => {
  const router = useRouter();
  const [isModalVisible, SetisModalVisible] = useState(false);
  const [name, Setname] = useState('');
  const [password, Setpassword] = useState('');
  const [teacherName, SetTeacherName] = useState('');
  const [email, Setemail] = useState('');
  const [section, Setsection] = useState('');
  const [filterSection, setFilterSection] = useState('');
  const [filterName, setFilterName] = useState('');
  const [studentData, SetstudentData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
    Teacher();

  }, []);

  const Teacher = async () => {
    const getTcher = await account.get();
    SetTeacherName(getTcher.name);
  };

  const AddtoDb = async () => {
    try {
      const db = await database.createDocument(
        '67bf249900391a288d42',
        '67c4559b0007ac2a4aa6',
        'unique()',
        {
          student_name: name,
          student_section: section,
          teacher_name: teacherName,
          student_email: email
        }
      );

      await account.create('unique()', email, password, name);
      console.log(db);
    } catch (error) {
      console.log(error);
    }
  };

  const Submit = () => {
    AddtoDb();
    getData();
    Teacher();
    SetisModalVisible(false);
  };

  const getData = async () => {
    setLoading(true);
    try {
      const get = await database.listDocuments(
        '67bf249900391a288d42',
        '67c4559b0007ac2a4aa6',
        [Query.equal('teacher_name', teacherName)]
      );
      SetstudentData(get.documents);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filterData = async () => {
    setLoading(true);
    try {
      const queries = [Query.equal('teacher_name', teacherName)];
      if (filterSection) {
        queries.push(Query.equal('student_section', filterSection));
      }
      if (filterName) {
        queries.push(Query.equal('student_name', filterName));
      }
      const get = await database.listDocuments(
        '67bf249900391a288d42',
        '67c4559b0007ac2a4aa6',
        queries
      );
      SetstudentData(get.documents);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.studentItem}>
      <Text style={styles.studentText}>Name: {item.student_name}</Text>
      <Text style={styles.studentText}>Section: {item.student_section}</Text>
      <Text style={styles.studentText}>Test Result: {item.Test_result} /20</Text>
      <Text style={styles.studentText}>Reading Level : {item.reading_level}</Text>
      <Text style={styles.studentText}>Frustration Test score: {item.frustration_test}/10</Text>
      <Text style={styles.studentText}>Instructional Test score: {item.instructional_test}/10</Text>
      <Text style={styles.studentText}>Quiz1 score: {item.quiz1_score}/5</Text>
      <Text style={styles.studentText}>Quiz2 score: {item.quiz2_score} /5</Text>
      <Text style={styles.studentText}>Quiz3 score: {item.quiz3_score} /5</Text>
      <Text style={styles.studentText}>Quiz4 score: {item.quiz4_score} /20</Text>
      <Text style={styles.studentText}>Quiz5 score: {item.quiz5_score} /15</Text>
    </View>
  );

  return (
    <SafeAreaView className='h-full' style={{ backgroundColor: 'EFE6D9' }}>
      <View style={styles.header}>
        <Text className='font-rubik-black text-white text-6xl mt-1.5'>TeacherMe</Text>
      </View>

      <View style={styles.Container}>
        <Text className='text-2xl font-rubik-bold flex flex-col ' style={{ marginLeft: 5 }}>MY STUDENTS</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addButton} onPress={() => SetisModalVisible(true)}>
            <Text style={styles.buttonText}>Add Student</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.refreshButton} onPress={getData}>
            <Text style={styles.buttonText}>Load Students</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.filterContainer}>
          <TextInput
            style={styles.filterInput}
            placeholder='Enter Section to Filter'
            value={filterSection}
            onChangeText={setFilterSection}
          />
          <TextInput
            style={styles.filterInput}
            placeholder='Enter Student Name to Filter'
            value={filterName}
            onChangeText={setFilterName}
          />
          <TouchableOpacity style={styles.filterButton} onPress={filterData}>
            <Text style={styles.buttonText}>Filter</Text>
          </TouchableOpacity>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#6A1B9A" />
        ) : (
          <FlatList
            data={studentData}
            renderItem={renderItem}
            keyExtractor={(item) => item.$id}
            style={styles.flatList}
          />
        )}
      </View>
      <Modal visible={isModalVisible} transparent={true}>
        <View style={styles.ModalView}>
          <TextInput
            value={name}
            placeholder='Enter Student Name'
            onChangeText={Setname}
            style={styles.Input}
          />

          <TextInput
            value={section}
            placeholder='Enter Student Section'
            onChangeText={Setsection}
            style={styles.Input}
          />

          <TextInput
            value={email}
            placeholder='Enter email'
            onChangeText={Setemail}
            style={styles.Input}
          />

          <TextInput
            value={password}
            placeholder='Enter Initial Password'
            onChangeText={Setpassword}
            style={styles.Input}
          />

          <TouchableOpacity style={{ marginTop: 10, alignSelf: 'center' }} onPress={Submit}>
            <Text className='font-rubik-bold text-white'>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ marginTop: 10, alignSelf: 'center' }} onPress={() => SetisModalVisible(false)}>
            <Text className='font-rubik-bold text-white'>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Thome;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: 'white',
    alignContent: 'center',
    padding: 10,
    borderRadius: 25,
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
    height: 80
  },
  header: {
    height: 60,
    backgroundColor: '#ca5cdd',
    marginBottom: 10,
    borderBottomWidth: 5,
    borderBottomColor: '#aaa7ad',
  },
  ModalView: {
    backgroundColor: '#be2ed6',
    height: 300,
    width: 300,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 250,
    borderRadius: 20,
    padding: 20,
  },
  Input: {
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  flatList: {
    marginTop: 1
  },
  studentItem: {
    backgroundColor: '#f3f3f3',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  studentText: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  addButton: {
    backgroundColor: '#6A1B9A',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginRight: 5,
  },
  refreshButton: {
    backgroundColor: '#6A1B9A',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  filterInput: {
    flex: 1,
    height: 40,
    borderColor: '#6A1B9A',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  filterButton: {
    backgroundColor: '#6A1B9A',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
});

