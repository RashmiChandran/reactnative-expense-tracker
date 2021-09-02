import React, {useState, useRef} from 'react';
import {View,  Pressable} from 'react-native';

import {
  Box,
  Input,
  Icon,
  Button,
  Text,
  HStack,
  Stack,
  Center,
  Flex,
  Heading,
  IconButton,
  FormControl,
  Alert, 
  Modal,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Theme from "../theme/theme";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CategoryList from './CategoryList';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const AddExpense = ({route, navigation}) => {
  const {type} = route.params;
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState();
  const [amount, setAmount] = useState(null);

  const shortid = require('shortid');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };
  const AddValue = async () =>{
    try {
      let transactionObj = {
          type,
          amount,
          category,
          date,
          id: shortid.generate()
        }
      const storedValue = await AsyncStorage.getItem('@transaction_list');
      const prevList = await JSON.parse(storedValue);
      const storedTotalAmount = await AsyncStorage.getItem('@total_amount');
      let totalAmountStored = await JSON.parse(storedTotalAmount);
      if(prevList !== null) {
        prevList.push(transactionObj);
        let totalIncomeParsed = await Number(totalAmountStored.totalIncome);
        let totalExpenseParsed = await Number(totalAmountStored.totalExpense);
        if(type == "Income"){
           totalAmountStored.totalIncome = totalIncomeParsed + Number(transactionObj.amount);
        }
        else{
           totalAmountStored.totalExpense = totalExpenseParsed + Number(transactionObj.amount);
        }
        await AsyncStorage.setItem('@total_amount', JSON.stringify(totalAmountStored));
        await AsyncStorage.setItem('@transaction_list', JSON.stringify(prevList));
      }
      else{
        let initialTransactionList = [transactionObj];
        if(type == "Income"){
          totalAmountStored= {"totalIncome" : Number(transactionObj.amount), "totalExpense" : 0};
        }
        else{
           totalAmountStored = {"totalIncome" :0, "totalExpense" : Number(transactionObj.amount)};
        }
        await AsyncStorage.setItem('@total_amount', JSON.stringify(totalAmountStored));
        await AsyncStorage.setItem('@transaction_list', JSON.stringify(initialTransactionList));
      }
      navigation.navigate('Spending');
      setDate(new Date());
      setCategory(null);
      setAmount(null);
      setSelectedCategoryItem(null);
    } catch(e) {
      console.log("err",e)
    }
  }


  const amountChange = (event) => {
        setAmount(event.nativeEvent.text);

  }
  const [modalVisible, setModalVisible] = useState(false);
  const initialRef = React.useRef(null);
  const [selectedCategoryItem, setSelectedCategoryItem] = useState(null);

  const handleModalClose = (selectedCategory) =>{
     setCategory(selectedCategory.name);
      setSelectedCategoryItem(selectedCategory)
  }

  return (
    <View>
        <Modal
        isOpen={modalVisible}
        onClose={setModalVisible}
        initialFocusRef={initialRef}
      >
       <CategoryList categoryType={type} selectedCategoryId={selectedCategoryItem && selectedCategoryItem.categoryId} modalVisible={setModalVisible} handleModalClose={handleModalClose}/>
      </Modal>
    
      <Heading  bg={Theme.colors.primary["500"]} p={4}  width={"100%"}>
          <Box width={"200px"} position="relative">
        <Stack width={"100%"} position="relative">
          <HStack alignItems="center" width={"100%"} position="relative">
            <Text color={"#ffffff"} >Add {type}</Text>
              <IconButton
            variant="solid" 
            onPress={() => navigation.navigate('Spending')}     
            icon={<Icon size="md" as={<MaterialIcons name="close" />} color="white" alignSelf="flex-end" />
            } />
          </HStack>
        </Stack>
            </Box>
      </Heading>
      <Box border={1} borderRadius="md" m={7} p={5} bg={'#ffffff'}>
            <Box w="100%">
            <FormControl isRequired>
              <Stack>
                <HStack>
                  <Center size={20}>
                    <FormControl.Label>Date</FormControl.Label>
                  </Center>
                  <Flex w="75%">
                    <Center>
                      <Input
                        value={date.toString().substr(4, 12)}
                        InputRightElement={
                          <Icon
                            as={<MaterialIcons name="date-range" />}
                            size="md"
                            onPress={showDatepicker}
                            m={2}
                            _light={{
                              color: 'black',
                            }}
                            _dark={{
                              color: 'gray.300',
                            }}
                          />
                        }
                        placeholder="Date"
                        _light={{
                          placeholderTextColor: 'blueGray.400',
                        }}
                        _dark={{
                          placeholderTextColor: 'blueGray.50',
                        }}
                      />
                    </Center>
                  </Flex>
                </HStack>
              </Stack>
              </FormControl>
            </Box>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={'date'}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}

            <Box w="100%">
            <FormControl isRequired>
              <Stack>
                <HStack>
                  <Center size={20}>
                    <FormControl.Label>Category</FormControl.Label>
                  </Center>
                  <Flex w={'75%'}  >
                    <Pressable onPress={() => setModalVisible(!modalVisible)}>
                    <Input
                      value={category}
                      isDisabled={true}
                      
                      InputRightElement={
                        <Icon
                          as={<MaterialIcons name="category" />}
                          size="md"
                          m={2}
                          _light={{
                            color: 'black',
                          }}
                          _dark={{
                            color: 'gray.300',
                          }}
                        />
                      }
                      placeholder="Input" // mx={4}
                      _light={{
                        placeholderTextColor: 'blueGray.400',
                      }}
                      _dark={{
                        placeholderTextColor: 'blueGray.50',
                      }}
                    />
                    </Pressable>
                  </Flex>
                </HStack>
              </Stack>
              </FormControl>
            </Box>
            <Box w="100%">
              <FormControl isRequired>
              <Stack>
                <HStack>
                  <Center size={20}>
                    <FormControl.Label>Amount</FormControl.Label>
                  </Center>
                  <Flex w={'75%'}>
                  <Input 
                   keyboardType = 'numeric'
                   value={amount}
                    onChange={amountChange}
                    InputRightElement={
                    <Icon
                      as={<FontAwesome name="rupee" />}
                      size="md"
                      m={2}
                      _light={{
                        color: 'black',
                      }}
                      _dark={{
                        color: 'gray.300',
                      }}
                    />
                    }
                    placeholder="Enter amount"
                        _light={{
                          placeholderTextColor: 'blueGray.400',
                        }}
                        _dark={{
                          placeholderTextColor: 'blueGray.50',
                        }}/>
                 
                  </Flex>
                </HStack>
              </Stack>
              </FormControl>
            </Box>
          </Box>
      <Box>
        <Stack alignItems="center">
          <HStack space={3} alignItems="center">
            <Center>
              <Button size={'lg'} onPress={()=> AddValue()} disabled={(category == null || (amount == null || amount == '')) ? true : false}>Add</Button>
            </Center>
          </HStack>
        </Stack>
      </Box>
    </View>
  );
};

export default AddExpense;
