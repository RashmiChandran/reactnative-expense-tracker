import React, {useEffect,useState} from 'react'
import {StyleSheet} from "react-native";
import { Container, Button, Stack, HStack, Text, Box, Center } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Theme from "../theme/theme";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native'

const Home = ({navigation }) => {
    const [incomeArr, setIncomeArr] = useState([]);
    const [expenseArr, setExpenseArr] = useState([]);
    const isFocused = useIsFocused();
    const [totalAmount, setTotalAmount] = useState({});
    
    useEffect(()=>{
        getTransactionList();
    },[isFocused])

    const getTransactionList = async ()=>{
            const storedValue = await AsyncStorage.getItem('@transaction_list');
            const transactionList = await JSON.parse(storedValue);
            const storedTotalAmount = await AsyncStorage.getItem('@total_amount');
            const totalAmountStored = await JSON.parse(storedTotalAmount);
            setTotalAmount(totalAmountStored);
            formTransactionArr(transactionList);
    };

    const formTransactionArr = (transactionData) =>{
        const expenseTransactionArr = [];
        const incomeTransactionArr = [];
        if(transactionData){
            // transactionData.list.map(transaction_item=> {
            // if(transaction_item.type == "Expense"){
            //     expenseTransactionArr.push(transaction_item);
            // }
            // else{
            //     incomeTransactionArr.push(transaction_item);
            // }
            // });
            // setExpenseArr(expenseTransactionArr);
            // setIncomeArr(incomeTransactionArr);
        }
        
    }

    return (
       
            <Box w="100%" justifyContent="center">
            <Box
                bg={{
                    linearGradient: {
                    colors: ['primary.200','#FAFAC6'],
                    start: [0, 0],
                    end: [1, 0],
                    },
                }}
                p={6}
                rounded="xl"
                m={6}
                shadow={9}
                 alignItems="center">
                <Box>
                    <Text style={styles.labelText}>Total Balance</Text>
                    <Center>
                        <Text style={styles.balanceAmount}>$ {totalAmount.totalIncome - totalAmount.totalExpense}</Text>
                    </Center>
                </Box>
                 <Container>
                    <Stack alignItems="flex-end">
                        <HStack justifyContent="center"  space={9}>
                            <HStack flexDirection="row" p={3} space={3} >
                                <Center>
                                    <FontAwesome name={"arrow-circle-up"} size={25} color={"#256D1B"} />
                                </Center>
                                <Box>
                                    <Text style={styles.labelText}>Income</Text>
                                    <Text style={styles.amountText}>$ {totalAmount.totalIncome}</Text>
                                </Box>
                            </HStack>
                            <HStack flexDirection="row" p={3} space={3}>
                                <Center>
                                    <FontAwesome name={"arrow-circle-down"} size={25} color={"#DC136C"}/>
                                </Center>
                                <Box>
                                    <Text style={styles.labelText}>Expense</Text>
                                    <Text style={styles.amountText}>$ {totalAmount.totalExpense}</Text>
                                </Box>
                            </HStack>
                        </HStack>
                    </Stack>
                </Container>
            </Box>
            <Box alignItems="center" justifyContent="center" width="100%">
               <Center alignItems="center" justifyContent="center" width="100%">
                <Container alignItems="center">
                    <Stack alignItems="center">
                    <HStack space={5} alignItems="center">
                            <Button onPress={() => navigation.navigate('Add',{type:"Expense"})} startIcon={<FontAwesome name={"plus"} size={10} color={"#FFFFFF"}/>}>Expense</Button>
                            <Button onPress={() => navigation.navigate('Add', {type:"Income"})} startIcon={<FontAwesome name={"plus"} size={10} color={"#FFFFFF"}/>}>Income</Button>
                        </HStack>
                    </Stack>
                </Container>
            </Center>
            </Box>
            </Box>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    bannerCard: {
        width: '100%'
    },
    labelText: {
        fontSize: 15,
        textAlign: "center"
    },
    balanceAmount: {
        fontSize: 25,
        fontWeight: "bold"

    },
    amountText : {
        fontSize: 20,
        fontWeight: "bold"
    }
})
