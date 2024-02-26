import React, {useState, FC} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import tw from 'twrnc';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import styles from './styles';

const CELL_COUNT: number = 4;

interface RenderCellProps {
  index: number;
  symbol: string;
  isFocused: boolean;
}

const Unmask: FC = () => {
  const [confirmationPIN, setConfirmationPIN] = useState<string>('');
  const [verificationPin, setVerificationPin] = useState<string>('');
  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  const [enableMask, setEnableMask] = useState<boolean>(true);
  const [enableMask1, setEnableMask1] = useState<boolean>(true);
  const [enteredPIN, setEnteredPIN] = useState<string>('');
  const [confirmPin, setConfirmPin] = useState<string>(''); // Add confirmPin state
  const ref1 = useBlurOnFulfill({value: enteredPIN, cellCount: CELL_COUNT});
  const ref2 = useBlurOnFulfill({value: confirmPin, cellCount: CELL_COUNT});
  const [props1, getCellOnLayoutHandler1] = useClearByFocusCell({
    value: enteredPIN,
    setValue: setEnteredPIN,
  });
  const [props2, getCellOnLayoutHandler2] = useClearByFocusCell({
    value: confirmPin,
    setValue: setConfirmPin,
  });

  const toggleMask = (): void => setEnableMask((f: boolean) => !f);
  const toggleMask1 = (): void => setEnableMask1((f: boolean) => !f);
  const renderCell = ({
    index,
    symbol,
    isFocused,
  }: RenderCellProps): JSX.Element => {
    let textChild: string | JSX.Element | null = null;

    if (symbol) {
      textChild = enableMask ? '•' : symbol;
    } else if (isFocused) {
      textChild = <Cursor />;
    }

    return (
      <Text
        key={index}
        style={[styles.cell, isFocused && styles.focusCell]}
        onLayout={
          isConfirming
            ? getCellOnLayoutHandler1(index)
            : getCellOnLayoutHandler2(index)
        }>
        {textChild}
      </Text>
    );
  };

  const handleConfirm = () => {
    if (confirmPin === enteredPIN) {
      console.log('Yay! PINs matched.');
      console.log('Entered PIN:', enteredPIN);
      console.log('Confirmation PIN:', confirmPin);
    } else {
      console.log('PINs do not match. Please try again.');
    }
    setEnteredPIN('');
    setConfirmPin('');
    setIsConfirming(false);
  };

  const handlePinChange = (pin: string): void => {
    const numericPIN = pin.replace(/[^0-9]/g, '');

    if (isConfirming) {
      setConfirmPin(numericPIN);
    } else {
      setVerificationPin(numericPIN);
      setEnteredPIN(numericPIN);
    }

    console.log(numericPIN);
  };

  const handleSubmit = () => {
    if (isConfirming) {
      if (confirmPin === verificationPin) {
        console.log('Yay! PINs matched.');
        console.log('Entered PIN:', enteredPIN);
        console.log('Confirmation PIN:', confirmPin);
      } else {
        console.log('PINs do not match. Please try again.');
      }
      setEnteredPIN('');
      setConfirmPin('');
      setIsConfirming(false);
    } else {
      if (enteredPIN.length < CELL_COUNT) {
        console.log('Enter More Pin');
        return;
      }

      console.log('Now, enter the PIN again to confirm.');
      setIsConfirming(true);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>Welcome to MRT Mobile</Text>
      {isConfirming ? (
        <View style={styles.fieldRow}>
          <CodeField
            ref={ref1}
            {...props1}
            value={enteredPIN}
            onChangeText={handlePinChange}
            cellCount={CELL_COUNT}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={renderCell}
            editable={!isConfirming} // Set editable to false when confirming
          />
        </View>
      ) : (
        <View style={styles.fieldRow}>
          <CodeField
            ref={ref1}
            {...props1}
            value={enteredPIN}
            onChangeText={handlePinChange}
            cellCount={CELL_COUNT}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={renderCell}
          />
          <Text style={styles.toggle} onPress={toggleMask}>
            {enableMask ? '🙈' : '🐵'}
          </Text>
          <TouchableOpacity style={tw``} onPress={handleSubmit}>
            <Text>Set Pin</Text>
          </TouchableOpacity>
        </View>
      )}
      {isConfirming && (
        <View style={styles.fieldRow}>
          <CodeField
            ref={ref2}
            {...props2}
            value={confirmPin}
            onChangeText={handlePinChange}
            cellCount={CELL_COUNT}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={renderCell}
          />
          <Text style={styles.toggle} onPress={toggleMask1}>
            {enableMask1 ? '🙈' : '🐵'}
          </Text>
          <TouchableOpacity style={tw``} onPress={handleConfirm}>
            <Text>Confirm Pin</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Unmask;
