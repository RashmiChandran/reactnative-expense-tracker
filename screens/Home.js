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
    
    useEffect(()=>{
        getTransactionList();
    },[isFocused])

    const getTransactionList = async ()=>{
            const storedValue = await AsyncStorage.getItem('@transaction_list');
            const transactionList = await JSON.parse(storedValue);
            const storedTotalAmount = await AsyncStorage.getItem('@total_amount');
            const totalAmountStored = await JSON.parse(storedValue);
            console.log("total Amount", storedTotalAmount)
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
            console.log("Expense",transactionData);
            console.log("Income",transactionData.totalIncome);
        }
        
    }

    return (
       
            <Container style={styles.container}>
                <Box>
                    <Center>Income</Center>
                    <Text></Text>
                </Box>
                <Box>
                    <Center>Expense</Center>
                    <Text></Text>
                </Box>
                <Stack space={3} alignItems="flex-end">
                   <HStack space={3} alignItems="flex-end">
                        <Button onPress={() => navigation.navigate('Add',{type:"Expense"})} startIcon={<FontAwesome name={"plus"} size={10} color={"#FFFFFF"}/>}>Expense</Button>
                        <Button onPress={() => navigation.navigate('Add', {type:"Income"})} startIcon={<FontAwesome name={"plus"} size={10} color={"#FFFFFF"}/>}>Income</Button>
                    </HStack>
                </Stack>
            </Container>
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
    }
})
