/* eslint-disable react/jsx-props-no-spreading */
import React, { SetStateAction } from 'react';
import { toast } from 'react-toastify';
import { Group, Text, useMantineTheme } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { Upload, Photo, X } from 'tabler-icons-react';
import { FileRejection, ErrorCode } from 'react-dropzone';

type Props = {
  setFile(value: SetStateAction<File | null | undefined>): void;
  setPreview(value: SetStateAction<string>): void;
};

export default function CustomImageDropzone({ setFile, setPreview }: Props) {
  const theme = useMantineTheme();
  const maxSize = 3; // Size in MB

  const readFile = (readerFile: File) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      if (e.target && typeof e.target.result === 'string') {
        setPreview(e.target.result);
      }
    };

    reader.readAsDataURL(readerFile);
  };

  const onRejectHandled = (files: FileRejection[]): void => {
    files.forEach((item) => {
      const { file, errors } = item;
      const baseMessage = `El archivo ${file.name}`;

      errors.forEach((errorItem) => {
        const { code } = errorItem;
        let message: string = `${baseMessage} `;

        switch (code) {
          case ErrorCode.FileTooLarge:
            message += `es mayor que ${maxSize} MB.`;
            break;
          case ErrorCode.FileInvalidType:
            message += 'tiene un formato inválido.';
            break;
          default:
            message += 'no pudo ser cargado.';
            break;
        }

        toast.error(message);
      });
    });
  };

  const onDropHandled = (files: File[]): void => {
    setFile(files[0]);
    readFile(files[0]);
  };

  return (
    <Dropzone
      onDrop={onDropHandled}
      onReject={onRejectHandled}
      maxSize={maxSize * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      multiple={false}
      radius="xs"
    >
      <Group position="center" spacing="xl" style={{ minHeight: 180, pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <Upload
            size={50}
            strokeWidth={1.5}
            color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
          />
        </Dropzone.Accept>

        <Dropzone.Reject>
          <X size={50} strokeWidth={1.5} color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]} />
        </Dropzone.Reject>

        <Dropzone.Idle>
          <Photo size={50} strokeWidth={1.5} />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline className="text-center">
            Arrastre las imágenes aquí o haga clic para seleccionar archivos.
          </Text>
          <Text size="sm" color="dimmed" inline mt={7} className="text-center">
            Adjunte el archivo que desea subir, el cual no debe exceder los {maxSize}MB
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}
