import { Feather } from '@expo/vector-icons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { InputPassword } from '../../components/InputPassword';
import { useAuth } from '../../hooks/auth';
import {
  Container,
  Content,
  Header,
  HeaderTitle,
  HeaderTop,
  LogoutButton,
  Option,
  Options,
  OptionTitle,
  Photo,
  PhotoButton,
  PhotoContainer,
  Section,
} from './styles';

export function Profile() {
  const { user } = useAuth();

  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);

  const theme = useTheme();
  const navigation = useNavigation<any>();

  function handleBack() {
    navigation.goBack();
  }

  function handleSignOut() {}

  function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
    setOption(optionSelected);
  }

  async function handleAvatarSelect() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    if (result.uri) {
      setAvatar(result.uri);
    }
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton color={theme.colors.shape} onPress={handleBack} />
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <LogoutButton onPress={handleSignOut}>
                <Feather name='power' size={24} color={theme.colors.shape} />
              </LogoutButton>
            </HeaderTop>
            <PhotoContainer>
              {!!avatar && (
                <Photo
                  source={{
                    uri: avatar,
                  }}
                />
              )}
              <PhotoButton onPress={handleAvatarSelect}>
                <Feather name='camera' size={24} color={theme.colors.shape} />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <Options>
              <Option
                active={option === 'dataEdit'}
                onPress={() => handleOptionChange('dataEdit')}
              >
                <OptionTitle active={option === 'dataEdit'}>Dados</OptionTitle>
              </Option>
              <Option
                active={option === 'passwordEdit'}
                onPress={() => handleOptionChange('passwordEdit')}
              >
                <OptionTitle active={option === 'passwordEdit'}>
                  Trocar Senha
                </OptionTitle>
              </Option>
            </Options>
            {option === 'dataEdit' ? (
              <Section>
                <Input
                  iconName='user'
                  placeholder='Nome'
                  autoCorrect={false}
                  defaultValue={name}
                  onChangeText={setName}
                />
                <Input
                  iconName='mail'
                  placeholder='E-mail'
                  editable={false}
                  defaultValue={user.email}
                />
                <Input
                  iconName='credit-card'
                  placeholder='CNH'
                  keyboardType='numeric'
                  defaultValue={driverLicense}
                  onChangeText={setDriverLicense}
                />
              </Section>
            ) : (
              <Section>
                <InputPassword iconName='lock' placeholder='Senha atual' />
                <InputPassword
                  iconName='lock'
                  placeholder='Nova senha'
                  editable={false}
                />
                <InputPassword
                  iconName='lock'
                  placeholder='Repetir senha'
                  editable={false}
                />
              </Section>
            )}
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
