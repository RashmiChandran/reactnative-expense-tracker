import React, {useState, useEffect} from 'react';
import {Text, Modal, Input, Button, List, Pressable} from 'native-base';
import categoryListData from '../assets/json/categoryList.json';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Theme from "../theme/theme";

const CategoryList = ({modalVisible, categoryType, selectedCategoryId, handleModalClose}) => {
  const [categoryList, setCategoryList] = useState([])
    useEffect( ()=>{
      if(categoryType == "Income"){
        setCategoryList(categoryListData.incomeCategory);
      }
      else{
        setCategoryList(categoryListData.expenseCategory);
      }
    })
   
  return (
    <Modal.Content>
      <Modal.CloseButton />
      <Modal.Header>Choose a category</Modal.Header>
      <Modal.Body>    
        <List space={2} my={2}  border={0}>
        {categoryList && categoryList.map((item,index)=>(
           <Pressable onPress={() => {
              handleModalClose(item)
              modalVisible(false)
             }}  key={index}>
           <List.Item w={"350px"}>
              <List.Icon color={Theme.colors.primary["500"]} as={<FontAwesome name={item.iconName} size={25} color={Theme.colors.primary["500"]} />} />
              {item.name}
              {item.categoryId == selectedCategoryId ? 
               (<List.Icon as={<FontAwesome name={"check"} size={25} color={"#256D1B"} />} position="absolute" right={0}/>) : ''}
            </List.Item> 
            </Pressable>           
        ))}
           
        </List>
      </Modal.Body>
    </Modal.Content>
  );
};

export default CategoryList;
