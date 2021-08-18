import React, {useState} from 'react';
import {View} from 'react-native';

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
  NumberInputField ,
  NumberInput
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Theme from "../theme/theme";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddExpense = ({route, navigation}) => {
  const {type} = route.params;
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState();
  const [amount, setAmount] = useState();

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
      navigation.navigate('Spending')
    } catch(e) {
      console.log("err",e)
    }
  }

  const categoryChange = (event) => {
    setCategory(event);
  };

  const amountChange = (event) => {
        setAmount(event.nativeEvent.text);

  }

  return (
    <View>
      <Heading size="lg" bg={Theme.colors.primary["500"]} p={4} color={"#ffffff"} width={"100%"} position="relative">
        Add {type}
        <IconButton
      variant="solid" 
      onPress={() => navigation.navigate('Spending')}     
      icon={<Icon size="md" as={<MaterialIcons name="close" />} color="white" />
       } />
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
              <Flex w={'75%'}>
                <Input
                  value={category}
                  onChangeText = {categoryChange}
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
              <NumberInput>
                <NumberInputField 
                  type={"number"}
                  value={amount}
                  onChange={amountChange}
                  p={3}
                  InputRightElement={
                    <Icon
                      as={<MaterialIcons name="attach-money" />}
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
                  }}
                />
                </NumberInput>
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
              <Button size={'lg'} onPress={()=> AddValue()}>Add</Button>
            </Center>
          </HStack>
        </Stack>
      </Box>
    </View>
  );
};

export default AddExpense;
